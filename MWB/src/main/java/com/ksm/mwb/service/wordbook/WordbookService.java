package com.ksm.mwb.service.wordbook;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ksm.mwb.framework.util.Constant;
import com.ksm.mwb.service.com.BaseService;

@Service("WordbookService")
public class WordbookService extends BaseService {
	
	@Autowired
	SqlSession sqlSession; //SqlSession 빈 DI	
	
	/**
	* @메소드명: selectWordbookList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 5:02:22
	* @설명: 단어장 목록 조회
	*/
	public Map<String, Object> selectWordbookList(StringBuilder logStr, Map<String, Object> inData) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		List<Map<String, Object>> list = sqlSession.selectList("mapper.wordbook.WordbookMapper.selectWordbookList", inData);
		result.put("data", list);
		result.put(Constant.OUT_DATA, list);
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		return result;
	}	
	
	/**
	* @메소드명: insertWordbook
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 4:43:42
	* @설명: 단어장 생성
	*/
	public Map<String, Object> insertWordbook(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		cnt = sqlSession.insert("mapper.wordbook.WordbookMapper.insertWordbook", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 등록에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}	

	/**
	* @메소드명: insertWord
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 7:40:56
	* @설명: 단어 등록
	*/
	public Map<String, Object> insertWord(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		cnt = sqlSession.insert("mapper.wordbook.WordbookMapper.insertWord", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 등록에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}		
	
	/**
	* @메소드명: insertWordbook
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 6:44:08
	* @설명: 단어장 수정
	 */	
	public Map<String, Object> updateWordbook(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		cnt = sqlSession.update("mapper.wordbook.WordbookMapper.updateWordbook", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 수정에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}	
	
	/**
	* @메소드명: deleteWordbook
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 1. 오후 7:00:24
	* @설명: 단어장 삭제
	*/	
	public Map<String, Object> deleteWordbook(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		cnt = sqlSession.update("mapper.wordbook.WordbookMapper.deleteWordbook", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 삭제에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}	
}
