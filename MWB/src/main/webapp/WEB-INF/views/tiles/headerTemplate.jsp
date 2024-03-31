<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${sessionScope.LOGIN_INFO eq null}">
	<%@ include file="/WEB-INF/views/user/loginModal.jsp" %><!-- 로그인 모달 -->
</c:if>
<%@ include file="/WEB-INF/views/user/chngPwModal.jsp" %><!-- 비밀번호 변경 모달  -->

<script src="<%=request.getContextPath()%>/resources/js/tiles/headerTemplate.js"></script> <!-- 헤더 템플릿 -->
<script>
	let loginInfoArr = '${sessionScope.LOGIN_INFO}'.slice(1, -1).split(', ');
	const loginInfo = {};
    loginInfoArr.map(item => {
    	loginInfo[item.split('=')[0]] = item.split('=')[1]
    });
	
	const roleSeq = '${sessionScope.LOGIN_INFO.roleSeq}';

	//자동 로그아웃 타이머
	let timeInterval;
	var sessionTime = '<%= session.getMaxInactiveInterval() %>';
	if(sessionTime != null){
		timeInterval = setInterval(function(){
			sessionTime = parseInt(sessionTime) - 1
			var leftTime = $dateUtil.secondToHour(sessionTime);
			$('#sessionTimer').text(leftTime);
			
			if(sessionTime == 0){
			    $.ajax({
			        url: '/user/logout.do',
			        type: 'POST',
			        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
			        dataType: 'json',
			        success: function (result) {
				        if (result.RESULT == Constant.RESULT_SUCCESS){
				            alert('장시간 동작이 없어 자동 로그아웃 되었습니다.')
				            location.replace('/');
				        } else {
							alert(result[Constant.OUT_RESULT_MSG])
						}
			        }
			    });					
			}
		}, 1000)
	}	
	
	//세션 시간 리셋하기
	function sessionTimeReset() {
		sessionTime = '<%= session.getMaxInactiveInterval() %>';
	}
</script>

<!-- Navbar (sit on top) -->
<div class="top">
	<div class="logoDiv">  
    	<a href="/" class="logo-font remove-a">Hello Papang</a>
 	</div>
 	<div class="navDiv">
	 	<div class="loginMnuDiv">
	 		<span style="width: 15px; float: right;">&nbsp;</span>
	 		<c:choose>
	 			<c:when test="${sessionScope.LOGIN_INFO eq null}">
					<a href="<%=request.getContextPath()%>/user/signUp" class="loginMnu remove-a"><i class="fa-solid fa-door-open loginMnuIcon"></i>회원가입</a>			 			
					<a id="loginModalbtn" class="loginMnu remove-a" href="javascript:loginModalOpen()"><i class="fa-solid fa-door-open loginMnuIcon"></i>로그인</a>
	 			</c:when>
	 			<c:otherwise>
					<span class="sessionTimer"><i class="fa-solid fa-clock loginMnuIcon"></i>자동 로그아웃: <span id="sessionTimer">02:00:00</span></span> 
					<a href="<%=request.getContextPath()%>/user/myPage" class="loginMnu remove-a"><i class="fa-solid fa-user loginMnuIcon"></i>마이페이지</a>
					<a href="javascript:loginOut()" class="loginMnu remove-a"><i class="fa-solid fa-door-open loginMnuIcon"></i>로그아웃</a>	
					<span class="loginMnu grayText"><span id="sessionUserId"></span>님 환영합니다.</span>
	 			</c:otherwise>
	 		</c:choose>
		</div>	
		<div id="navMnuDiv" class="navMnuDiv"></div>	
	</div>
</div>