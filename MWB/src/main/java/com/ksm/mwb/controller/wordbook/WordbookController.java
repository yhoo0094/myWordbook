package com.ksm.mwb.controller.wordbook;

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
import com.ksm.mwb.service.wordbook.WordbookService;

@Controller
@RequestMapping("/wordbook")
public class WordbookController extends BaseController {
	
	@Resource(name = "WordbookService")
	protected WordbookService wordbookService;
	
	/**
	* @메소드명: selectWordbookList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 5:02:22
	* @설명: 단어장 목록 조회
	*/
	@RequestMapping("/selectWordbookList.do")
	public void selectWordbookList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = wordbookService.selectWordbookList((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}		
	
	/**
	* @메소드명: insertWordbook
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 4:43:42
	* @설명: 단어장 등록
	*/
	@RequestMapping("/insertWordbook.do")
	public void insertWordbook(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		inData.put("loginInfo", RequestUtil.getLoginInfo(request));
		Map<String, Object> outData = wordbookService.insertWordbook((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);

		Gson gson = new Gson();
		String json = gson.toJson(outData);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("application/x-json; charset=UTF-8");
	}	
	
	/**
	* @메소드명: insertWordbook
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 6:44:08
	* @설명: 단어장 수정
	 */
	@RequestMapping("/updateWordbook.do")
	public void updateWordbook(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		inData.put("loginInfo", RequestUtil.getLoginInfo(request));
		Map<String, Object> outData = wordbookService.updateWordbook((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);

		Gson gson = new Gson();
		String json = gson.toJson(outData);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("application/x-json; charset=UTF-8");
	}	
	
	/**
	* @메소드명: insertWord
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 7:40:56
	* @설명: 단어 등록
	*/
	@RequestMapping("/insertWord.do")
	public void insertWord(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		inData.put("loginInfo", RequestUtil.getLoginInfo(request));
		Map<String, Object> outData = wordbookService.insertWord((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);

		Gson gson = new Gson();
		String json = gson.toJson(outData);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("application/x-json; charset=UTF-8");
	}	
	
	/**
	* @메소드명: deleteWordbook
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 7:00:24
	* @설명: 단어장 삭제
	*/
	@RequestMapping("/deleteWordbook.do")
	public void deleteWordbook(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		inData.put("loginInfo", RequestUtil.getLoginInfo(request));
		Map<String, Object> outData = wordbookService.deleteWordbook((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);

		Gson gson = new Gson();
		String json = gson.toJson(outData);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("application/x-json; charset=UTF-8");
	}		
	
}
