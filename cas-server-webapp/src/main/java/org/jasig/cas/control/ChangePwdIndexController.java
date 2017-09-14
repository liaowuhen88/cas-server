
package org.jasig.cas.control;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 */
public class ChangePwdIndexController extends AbstractController {

    protected ModelAndView handleRequestInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {

        final ModelAndView modelAndView = new ModelAndView();

        modelAndView.setViewName("doubao/ui/pwdreset");

        return modelAndView;
    }

}
