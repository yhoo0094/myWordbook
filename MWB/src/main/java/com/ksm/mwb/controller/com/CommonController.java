package com.ksm.mwb.controller.com;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;
import com.ksm.mwb.framework.util.Configuration;
import com.ksm.mwb.framework.util.OSValidator;
import com.ksm.mwb.framework.util.OS_Type;
import com.ksm.mwb.framework.util.RequestUtil;
import com.ksm.mwb.framework.util.ResponseUtil;
import com.ksm.mwb.service.com.CommonService;

@Controller
@RequestMapping("/common")
public class CommonController {
	
	@Resource(name = "CommonService")
	protected CommonService commonService;

	/**
	* @메소드명: ckUploadImage
	* @작성자: KimSangMin
	* @생성일: 2023. 1. 26. 오후 5:47:15
	* @설명: CK에디터 이미지 업로드
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/ckUploadImage.do")
	public void ckUploadImage(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject jsonObject = new JSONObject();
	    PrintWriter printWriter = null;
		
		String originalImageName = ""; //원본이름
	    String imageName = ""; //저장본이름
	    String extension = ""; //확장자

	    MultipartFile file = request.getFile("upload");
        originalImageName = file.getOriginalFilename();
        extension = FilenameUtils.getExtension(originalImageName);
        imageName = "img_" + UUID.randomUUID() + "." + extension;	  
        
        StringBuffer tmp = new StringBuffer();
        
        //파일 저장 경로 만들기 (추후 구현)

		//현재 날짜 구하기
		LocalDate date = LocalDate.now();
		DateTimeFormatter dtfDate = DateTimeFormatter.ofPattern("yyyyMMdd");
		String nowDate = date.format(dtfDate);	
		
		OS_Type os = OSValidator.getOS();	//OS타입 구하기(UNKNOWN(0), WINDOWS(1), LINUX(2), MAC(3), SOLARIS(4))
		Configuration conf = new Configuration();
		String filePath = new String(conf.getString("Global." + os + ".getComEditorImagePath").getBytes("ISO-8859-1"), "UTF-8") + nowDate;	
		
		File dir = new File(filePath);
		if(!dir.isDirectory()) {	//해당 경로가 디렉토리인지 확인
			if(!dir.exists()) {		//해당 경로 디렉토리가 있는지 확인
				dir.mkdirs();		//해당 디렉토리가 없으면 생성
			}
		}		
		
        File imageUpload = new File(filePath + "/" + imageName);
        file.transferTo(imageUpload);
	    
        //jsonObject.put("url", "/resources/images/editor/" + nowDate + "/" + imageName);
        jsonObject.put("url", "/common/editor/" + nowDate + "/" + imageName);
        
        //리턴 response 작성
//        printWriter = response.getWriter();
//        response.setContentType("text/html");
//        printWriter.println(jsonObject);
        
		Gson gson = new Gson();
		String json = gson.toJson(jsonObject);
		response.getWriter().print(json);	//결과 json형태로 담아서 보내기
		response.setContentType("text/html");
	}	
	
	/**
	* @메소드명: showImage
	* @작성자: KimSangMin
	* @생성일: 2023. 1. 30. 오전 9:57:43
	* @설명: 에디터 이미지 조회
	 */
	@ResponseBody
	@GetMapping("/{dir1}/{dir2}/{filename}.{extension}")
	public org.springframework.core.io.Resource showImage(@PathVariable String dir1, @PathVariable String dir2, @PathVariable String filename, @PathVariable String extension) throws Exception {
		OS_Type os = OSValidator.getOS();	//OS타입 구하기(UNKNOWN(0), WINDOWS(1), LINUX(2), MAC(3), SOLARIS(4))
		Configuration conf = new Configuration();
		String filePath = new String(conf.getString("Global." + os + ".getComNasPath").getBytes("ISO-8859-1"), "UTF-8");
		
	 	return new UrlResource("file:///" + filePath + dir1 + "/" + dir2 + "/" + filename + "." + extension);
	 }	
	
	/**
	* @메소드명: selectCodeList
	* @작성자: KimSangMin
	* @생성일: 2023. 11. 24. 오후 9:40:49
	* @설명: 공통 코드 조회
	 */
	@RequestMapping("/selectCodeList.do")
	public void selectCodeList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = commonService.selectCodeList((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}
	
	/**
	* @메소드명: selectSideBarList
	* @작성자: KimSangMin
	* @생성일: 2023. 11. 30. 오전 8:35:49
	* @설명: 사이드바 메뉴 목록 조회
	*/
	@RequestMapping("/selectSideBarList.do")
	public void selectSideBarList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = commonService.selectSideBarList((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}
	
	/**
	* @메소드명: selectNavMnuList
	* @작성자: KimSangMin
	* @생성일: 2023. 12. 4. 오후 4:42:32
	* @설명: 네비게이션 메뉴 목록 조회
	*/
	@RequestMapping("/selectNavMnuList.do")
	public void selectNavMnuList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = commonService.selectNavMnuList((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		ResponseUtil.setResAuto(response, inData, outData);
	}
	
	/**
	* @메소드명: getImage
	* @작성자: KimSangMin
	* @생성일: 2023. 12. 6. 오후 7:58:27
	* @설명: 이미지 조회
	 */
	@RequestMapping("/getImage.do")
	public ResponseEntity<byte[]> getImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> inData = RequestUtil.getParameterMap(request);
		Map<String, Object> outData = commonService.getImage((StringBuilder)request.getAttribute("IN_LOG_STR"), inData);
		
		String atcFilePath = (String) outData.get("atcFilePath");
		String saveAtcFileNm = (String) outData.get("saveAtcFileNm");
		
        // NAS 경로에서 이미지 파일을 읽어옵니다.
        File imageFile = new File(atcFilePath + saveAtcFileNm);
        
        // 이미지 파일을 byte 배열로 읽어옵니다.
        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
        
        // HTTP 응답으로 이미지를 전송합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // 이미지 타입에 맞게 설정
        
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
