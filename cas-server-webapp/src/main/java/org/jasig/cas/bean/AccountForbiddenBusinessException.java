package org.jasig.cas.bean;

/**
 * Created by 茄子先生 on 2016/9/28.
 */
public class AccountForbiddenBusinessException extends RuntimeException {
    public AccountForbiddenBusinessException(String message) {
        super(message);
    }

    public AccountForbiddenBusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
