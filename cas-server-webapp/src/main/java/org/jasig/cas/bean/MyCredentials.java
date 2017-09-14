package org.jasig.cas.bean;

import org.jasig.cas.authentication.principal.Credentials;

/**
 * Created by 茄子先生 on 2016/9/24.
 */

public class MyCredentials implements Credentials {
    private String username;
    private String pwd ;
    private String salt;
    private String uuid;
    private String code;
    private int failCount;


    //状态
    public static final byte STATUS_VALID = 1; //可用
    public static final byte STATUS_INVALID = 0;//不可用

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getFailCount() {
        return failCount;
    }

    public void setFailCount(int failCount) {
        this.failCount = failCount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
