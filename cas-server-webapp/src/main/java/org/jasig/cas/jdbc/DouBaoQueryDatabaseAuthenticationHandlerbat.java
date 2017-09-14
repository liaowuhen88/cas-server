package org.jasig.cas.jdbc;

import org.jasig.cas.adaptors.jdbc.AbstractJdbcUsernamePasswordAuthenticationHandler;
import org.jasig.cas.authentication.handler.AuthenticationException;
import org.jasig.cas.authentication.principal.UsernamePasswordCredentials;
import org.jasig.cas.util.MD5Util;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * Created by 茄子先生 on 2016/9/24.
 */
public class DouBaoQueryDatabaseAuthenticationHandlerbat extends AbstractJdbcUsernamePasswordAuthenticationHandler {
    @NotNull
    private String sql;

    public DouBaoQueryDatabaseAuthenticationHandlerbat() {
    }

    public boolean authenticateUsernamePasswordInternal(UsernamePasswordCredentials credentials) throws AuthenticationException {
        String username = this.getPrincipalNameTransformer().transform(credentials.getUsername());
        String password = credentials.getPassword();
        String encryptedPassword = this.getPasswordEncoder().encode(password);

        try { 
           // RowMapper<MyCredentials> rm = ParameterizedBeanPropertyRowMapper.newInstance(MyCredentials.class);
            Map map =  this.getJdbcTemplate().queryForMap(this.sql, new Object[]{username});

           // MyCredentials dbPassword = (MyCredentials)this.getJdbcTemplate().queryForObject(this.sql, MyCredentials.class, new Object[]{username});
           // return dbPassword.equals(encryptedPassword);
            return validUser(map,password) ;
        } catch (IncorrectResultSizeDataAccessException var6) {
            return false;
        }
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    private boolean validUser(Map map,String password)  {
        if (null != map) {
            Integer status = (Integer)map.get("status");
           /* if (null == status || MyCredentials.STATUS_INVALID == status) {
                return false ;
               // throw new LoginException("user.invalid");
            }*/
//            if (user.getIsAdmin() != Constant.IS_ADMIN_YES) {
//                throw new LoginException("The user cannot login");
//            }
            String dbPwd = (String)map.get("pwd");
            String salt = (String)map.get("salt");
            if (null != dbPwd && dbPwd.equals(MD5Util.getMD5String(password + salt))) {
                return true;
            } else {
               // throw new LoginException("login.pwd.error");
                return  false ;
            }
        } else {
            return false ;
            //throw new LoginException("user.not.found");
        }
    }
}
