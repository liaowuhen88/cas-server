package org.jasig.cas.bean;

/**
 * Created by 茄子先生 on 2016/9/28.
 */
public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
