package org.jasig.cas.bean;

import org.jasig.cas.authentication.handler.AuthenticationException;

/**
 * Created by 茄子先生 on 2016/9/28.
 */
public class DoubaoAuthenticationException extends AuthenticationException {
    public DoubaoAuthenticationException(String message) {
        super(message);
    }

    public DoubaoAuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}
