/*
 * Licensed to Jasig under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Jasig licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.jasig.cas.adaptors.x509.authentication.handler.support;

import java.security.GeneralSecurityException;


/**
 * Strategy interface for enforcing various policy matters related to certificate
 * revocation, such as what to do when revocation data is unavailable or stale.
 *
 * @author Marvin S. Addison
 * @version $Revision$
 * @since 3.4.6
 *
 */
public interface RevocationPolicy<T> {
    /**
     * Applies the policy.
     * 
     * @param data Data to help make a decision according to policy.
     *
     * @throws GeneralSecurityException When policy application poses a security
     * risk or policy application is prevented for security reasons.
     */
    void apply(T data) throws GeneralSecurityException;
}
