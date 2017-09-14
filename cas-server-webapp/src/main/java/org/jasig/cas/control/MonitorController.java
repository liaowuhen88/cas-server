
package org.jasig.cas.control;

import org.jasig.cas.util.JSONUtil;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
public class MonitorController extends AbstractController {

    protected ModelAndView handleRequestInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        ModelAndView mv = new ModelAndView();
        Map data = new HashMap();
        data.put("success",true);
        data.put("data","ALL_PASS=OK");
        mv.addObject("data", JSONUtil.toJson(data));
        mv.setViewName("doubao/ui/monitor");


        return mv;
    }


}
