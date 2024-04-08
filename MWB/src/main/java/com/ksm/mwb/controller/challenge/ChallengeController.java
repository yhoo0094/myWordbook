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
	* @메소드명: selectchalList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 8. 오전 8:19:58
	* @설명: 챌린지 목록 조회
	*/
	@RequestMapping("/selectchalList.do")
	public void selectchalList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = challengeService.selectchalList((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}		
	
	/**
	* @메소드명: selectChalWordList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 8. 오전 8:35:46
	* @설명: 챌린지 단어 목록 조회
	*/
	@RequestMapping("/selectChalWordList.do")
	public void selectChalWordList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = challengeService.selectChalWordList((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}		
	
	/**
	* @메소드명: insertChal
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 4. 오후 7:36:17
	* @설명: 챌린지 생성
	 */
	@RequestMapping("/insertChal.do")
	public void insertChal(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		inData.put("loginInfo", RequestUtil.getLoginInfo(request));
		Map<String, Object> outData = challengeService.insertChal((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);

		Gson gson = new Gson();
		String json = gson.toJson(outData);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("application/x-json; charset=UTF-8");
	}		

	/**
	* @메소드명: updateCorrect
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 8. 오후 8:23:37
	* @설명: 정답/오답 입력
	 */
	@RequestMapping("/updateCorrect.do")
	public void updateCorrect(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		inData.put("loginInfo", RequestUtil.getLoginInfo(request));
		Map<String, Object> outData = challengeService.updateCorrect((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);

		Gson gson = new Gson();
		String json = gson.toJson(outData);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("application/x-json; charset=UTF-8");
	}		
}
