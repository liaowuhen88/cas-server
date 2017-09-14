package org.jasig.cas.bean;

/**
 * Created by 茄子先生 on 2016/9/28.
 */
public class PasswordErrorBusinessException extends RuntimeException {
    public PasswordErrorBusinessException(String message) {
        super(message);
    }

    public PasswordErrorBusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
