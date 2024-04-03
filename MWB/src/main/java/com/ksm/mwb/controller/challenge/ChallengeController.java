package com.ksm.mwb.controller.challenge;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.ksm.mwb.controller.com.BaseController;
import com.ksm.mwb.framework.util.RequestUtil;
import com.ksm.mwb.framework.util.ResponseUtil;
import com.ksm.mwb.service.challenge.ChallengeService;
import com.ksm.mwb.service.wordbook.WordbookService;

@Controller
@RequestMapping("/challenge")
public class ChallengeController extends BaseController {
	
	@Resource(name = "ChallengeService")
	protected ChallengeService challengeService;
		
	/**
	* @메소드명: selectChalWordList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 3. 오후 2:34:32
	* @설명: 챌린지 단어 조회
	 */
	@RequestMapping("/selectChalWord.do")
	public void selectChalWordList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = challengeService.selectChalWord((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}		
}
