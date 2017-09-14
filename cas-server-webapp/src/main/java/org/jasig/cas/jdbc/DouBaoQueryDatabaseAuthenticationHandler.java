package org.jasig.cas.jdbc;

import org.jasig.cas.adaptors.jdbc.AbstractJdbcUsernamePasswordAuthenticationHandler;
import org.jasig.cas.authentication.handler.AuthenticationException;
import org.jasig.cas.authentication.principal.UsernamePasswordCredentials;
import org.jasig.cas.bean.BusinessException;
import org.jasig.cas.bean.DoubaoAuthenticationException;
import org.jasig.cas.bean.MyCredentials;
import org.jasig.cas.service.UserService;
import org.jasig.cas.util.MD5Util;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import javax.security.auth.login.LoginException;
import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * Created by 茄子先生 on 2016/9/24.
 */
public class DouBaoQueryDatabaseAuthenticationHandler extends AbstractJdbcUsernamePasswordAuthenticationHandler {
    @NotNull
    private String sql;

    private UserService userService;

    public DouBaoQueryDatabaseAuthenticationHandler() {
    }

    public boolean authenticateUsernamePasswordInternal(UsernamePasswordCredentials credentials) throws AuthenticationException {
        String username = this.getPrincipalNameTransformer().transform(credentials.getUsername());
        String password = credentials.getPassword();
        String encryptedPassword = this.getPasswordEncoder().encode(password);

            // RowMapper<MyCredentials> rm = ParameterizedBeanPropertyRowMapper.newInstance(MyCredentials.class);
            Map map =  this.getJdbcTemplate().queryForMap(this.sql, new Object[]{username});

            // MyCredentials dbPassword = (MyCredentials)this.getJdbcTemplate().queryForObject(this.sql, MyCredentials.class, new Object[]{username});
            // return dbPassword.equals(encryptedPassword);
            return userService.validUser(username,map,password) ;

    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public String getSql() {
        return sql;
    }
}
