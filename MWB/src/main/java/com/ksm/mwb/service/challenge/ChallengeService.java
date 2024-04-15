package com.ksm.mwb.service.challenge;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ksm.mwb.framework.util.Constant;
import com.ksm.mwb.service.com.BaseService;

@Service("ChallengeService")
public class ChallengeService extends BaseService {
	
	@Autowired
	SqlSession sqlSession; //SqlSession 빈 DI	
	
	/**
	* @메소드명: selectChalWordList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 8. 오전 8:35:46
	* @설명: 챌린지 단어 목록 조회
	*/	
	public Map<String, Object> selectChalWordList(StringBuilder logStr, Map<String, Object> inData) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		List<Map<String, Object>> list  = sqlSession.selectList("mapper.challenge.ChallengeMapper.selectChalWordList", inData);
		result.put(Constant.OUT_DATA, list);
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		return result;
	}		
	
	/**
	* @메소드명: selectchalList
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 8. 오전 8:19:58
	* @설명: 챌린지 목록 조회
	*/	
	public Map<String, Object> selectchalList(StringBuilder logStr, Map<String, Object> inData) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		List<Map<String, Object>> list  = sqlSession.selectList("mapper.challenge.ChallengeMapper.selectchalList", inData);
		result.put(Constant.OUT_DATA, list);
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		return result;
	}	
	
	/**
	* @메소드명: insertChal
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 4. 오후 7:36:17
	* @설명: 챌린지 생성
	*/	
	public Map<String, Object> insertChal(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		cnt = sqlSession.insert("mapper.challenge.ChallengeMapper.insertChal", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 등록에 실패했습니다.");
		}
		
		cnt = sqlSession.insert("mapper.challenge.ChallengeMapper.insertChalWord", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 등록에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}	
	
	/**
	* @메소드명: updateCorrect
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 8. 오후 8:23:37
	* @설명: 정답/오답 입력
	 */	
	public Map<String, Object> updateCorrect(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		//정답일 경우 정답여부 Y로 수정
		String isCorrectYn = (String) inData.get("isCorrectYn");
		if(isCorrectYn != null && isCorrectYn.equals("Y")) {
			cnt = sqlSession.update("mapper.challenge.ChallengeMapper.updateCorrect", inData);
			if(cnt == 0) {
				result.put(Constant.RESULT, Constant.RESULT_FAILURE);
				result.put(Constant.OUT_RESULT_MSG, "데이터 등록에 실패했습니다.");
			}
		}
		
		//정/오답 횟수 수정
		cnt = sqlSession.update("mapper.challenge.ChallengeMapper.updateCorrectCnt", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 등록에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}	
	
	/**
	* @메소드명: deleteChal
	* @작성자: KimSangMin
	* @생성일: 2024. 4. 15. 오후 7:38:08
	* @설명: 챌린지 삭제
	*/	
	public Map<String, Object> deleteChal(StringBuilder logStr, Map<String, Object> inData) throws Exception
	{
		Map<String, Object> result = new HashMap<String, Object>();
		int cnt = 0;
		
		cnt = sqlSession.delete("mapper.challenge.ChallengeMapper.deleteChal", inData);
		if(cnt == 0) {
			result.put(Constant.RESULT, Constant.RESULT_FAILURE);
			result.put(Constant.OUT_RESULT_MSG, "데이터 삭제에 실패했습니다.");
		}
		
		result.put(Constant.RESULT, Constant.RESULT_SUCCESS);
		result.put(Constant.OUT_DATA, cnt);
		return result;
	}		
}
