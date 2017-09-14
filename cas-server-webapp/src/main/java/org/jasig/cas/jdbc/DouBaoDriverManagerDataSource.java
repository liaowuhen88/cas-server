package org.jasig.cas.jdbc;

import org.jasig.cas.util.PropertiesUtil;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.util.Map;

/**
 * Created by 茄子先生 on 2016/9/29.
 */


public class DouBaoDriverManagerDataSource extends DriverManagerDataSource {

    public DouBaoDriverManagerDataSource(){
        super();
        Map<String,String > map = PropertiesUtil.get(this.getClass().getClassLoader(),"spring-mybatis-config.properties");

        super.setDriverClassName(map.get("jdbc_driverClassName"));
        super.setUrl(map.get("jdbc_url"));
        super.setUsername(map.get("jdbc_username"));
        super.setPassword(map.get("jdbc_password"));


        //filterConfig.getServletContext().setInitParameter("casServerUrlPrefix",map.get("cas.server.login.url"));
    }


}
