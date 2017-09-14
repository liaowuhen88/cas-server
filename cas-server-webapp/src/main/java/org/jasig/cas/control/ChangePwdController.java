
package org.jasig.cas.control;
import org.jasig.cas.bean.BusinessException;
import org.jasig.cas.bean.DoubaoAuthenticationException;
import org.jasig.cas.service.UserService;
import org.jasig.cas.util.MD5Util;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
public class ChangePwdController extends AbstractController {

    private UserService userService;

    protected ModelAndView handleRequestInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {

        final ModelAndView modelAndView = new ModelAndView();

        Map data = new HashMap();
        data.put("success",false);
        String method = httpServletRequest.getMethod();

        if(method.equals(HttpMethod.POST.name())){
            String username = httpServletRequest.getParameter("username");
            String password = httpServletRequest.getParameter("password");
            String newPassword = httpServletRequest.getParameter("newPassword");

            boolean flag = false ;
            Map map = null;
            if(null != username && ""!=username.trim()){
                try{
                     map =  userService.queryForMap(username);

                    if(null != password && ""!=password.trim()){
                        flag = userService.validUser(username,map,password) ;
                        if(flag){
                            String salt = (String)map.get("salt");
                            String md5password = MD5Util.getMD5String(newPassword + salt);
                            userService.updatePassword(username,md5password);

                            data.put("msg","密码修改成功");
                            data.put("success",true);
                        }
                    }
                }catch( DoubaoAuthenticationException e){
                    e.printStackTrace();
                    data.put("msg",username+e.getCode());
                }catch(BusinessException e){
                    e.printStackTrace();
                    data.put("msg",username+e.getMessage());
                }catch(Exception e){
                    e.printStackTrace();
                    data.put("msg","系统异常");
                }
            }


        }

        modelAndView.addAllObjects(data);
        modelAndView.setViewName("doubao/ui/pwdresetResult");

        return modelAndView;
    }

    public UserService getUserService() {
        return userService;
    }



    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
