package org.jasig.cas.service;

import org.jasig.cas.bean.*;
import org.jasig.cas.util.MD5Util;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by liaowuhen on 2016/10/12.
 */
public class UserService {
    private static final Map<String,Integer> cacheUser = new HashMap<String, Integer>();

    private JdbcTemplate jdbcTemplate;

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Map queryForMap(String username){

        String sql="select * from customerserviceuser where name =?";

        return this.getJdbcTemplate().queryForMap(sql, new Object[]{username});
    }

    public int updatePassword(String username,String md5password){
        removeCacheUser(username);
        String sql = "update customerserviceuser set pwd = ? where name =?";
        return this.getJdbcTemplate().update(sql,new Object[]{md5password,username});
    }

    public int updateStatus(String username){
        String sql = "update customerserviceuser set status ="+ MyCredentials.STATUS_INVALID +"  where name =?";
        return this.getJdbcTemplate().update(sql,new Object[]{username});
    }

    public void removeCacheUser(String username){

          cacheUser.remove(username);

    }

    public String updateCacheUser(String username){
        Integer count = cacheUser.get(username);
        if(null != count){
            count++;
            if(count < 5){
                cacheUser.put(username,count);
                return "密码错误,还有"+(5-count)+"次机会";

            }else {
                cacheUser.remove(username);
                updateStatus(username);
                return "账号被锁定，请联系管理员";
            }
        }else {
            count = 1;

            cacheUser.put(username,count);
            return "密码错误,还有"+(5-count)+"次机会";
        }
    }


    public boolean validUser(String username,Map map, String password)  throws DoubaoAuthenticationException {
        if (null != map) {
            Integer status = (Integer)map.get("status");
            if (null == status || MyCredentials.STATUS_INVALID == status) {
                throw new DoubaoAuthenticationException("您的账号被锁定");
            }

            String dbPwd = (String)map.get("pwd");
            String salt = (String)map.get("salt");
            if (null != dbPwd && dbPwd.equals(MD5Util.getMD5String(password + salt))) {
                removeCacheUser(username);
                return true;
            } else {
                // return false ;
                String message = updateCacheUser(username);
                throw new DoubaoAuthenticationException(message);
            }
        } else {
            throw new DoubaoAuthenticationException("此账号不存在");
        }
    }


}
