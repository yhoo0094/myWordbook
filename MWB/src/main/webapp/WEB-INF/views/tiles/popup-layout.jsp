<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"  %>

<% 
/**
 * @화면명: 팝업 레이아웃
 * @작성자: KimSangMin
 * @생성일: 2023. 11. 20. 오후 8:58:51
 * @설명: 팝업에 타일즈 적용을 위한 레이아웃 페이지
**/
%>

<!DOCTYPE html>
<html>
  <head>
  	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/font.css"> <!-- 폰트적용 -->
	<link rel="preconnect" href="https://fonts.googleapis.com"> <!-- google 폰트적용 -->
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <!-- google 폰트적용 -->
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"> <!-- google 폰트적용 -->
    <link rel="shortcut icon" type="image/x-icon" href="<%=request.getContextPath()%>/resources/images/title-logo/superhero.png"> <!-- title 아이콘 변경 -->	
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />	<!-- jQuery Modal -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.13.1/rr-1.3.3/datatables.min.css"/><!-- datatable -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css"><!-- datatable -->
    <link rel="stylesheet" type="text/css" href="/resources/lib/datetimepicker/jquery.datetimepicker.css"><!-- datetimepicker -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" /><!-- jstree(트리구조) -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" /><!-- 이미지 슬라이드 -->

	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/template.css"> <!-- 공통 css(개별 클래스) -->
 	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/common.css"> <!-- 공통 css(단순 값) -->
    <link rel="stylesheet" href="<%=request.getContextPath()%><tiles:getAsString name="css"/>"> <!-- 페이지 개별 css -->   
	
	<script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
	
	<!-- datatable -->
	<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.13.1/datatables.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.print.min.js"></script>	 
    <script type="text/javascript" src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.min.js"></script>	
    <script src="<%=request.getContextPath()%>/resources/lib/dataTables/dataTables.rowReorder.js"></script> <!-- RowReorder 관련 -->
    <script src="<%=request.getContextPath()%>/resources/lib/dataTables/jquery.dataTables.js"></script> <!-- RowReorder 관련 -->
    <script>$.fn.DataTable.ext.pager.numbers_length = 11;	//페이지 버튼 표시할 개수</script>

	<script src="https://kit.fontawesome.com/e2689e2fa2.js"></script> <!-- 아이콘 -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script><!-- jQuery Modal -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script><!-- jstree(트리구조) -->
	<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script><!-- 이미지 슬라이드 -->
	
	<script src="<%=request.getContextPath()%>/resources/js/com/common.js"></script> <!-- 페이지 공통 -->
	<script src="<%=request.getContextPath()%>/resources/js/com/tiles-layout.js"></script> <!-- 페이지 공통 -->
	<script src="<%=request.getContextPath()%>/resources/js/framework/util.js"></script> <!-- 유틸 -->
	<script src="<%=request.getContextPath()%>/resources/js/framework/dateUtil.js"></script> <!-- 날짜 유틸 -->
	<script src="<%=request.getContextPath()%>/resources/js/framework/excelUtil.js"></script> <!-- 엑셀 유틸 -->
	<script src="<%=request.getContextPath()%>/resources/js/framework/editorUtil.js"></script> <!-- 에디터 -->
	<script src="<%=request.getContextPath()%>/resources/js/framework/constant.js"></script> <!-- js 공통 변수 -->
	
	<script src="<%=request.getContextPath()%>/resources/js/framework/ckeditor5_inline/build/ckeditor.js"></script> <!-- ck에디터 -->
    <script src="<%=request.getContextPath()%>/resources/js/framework/ckeditor5_inline/build/editor.js"></script><!-- ck에디터 -->
    <script src="<%=request.getContextPath()%>/resources/js/framework/ckeditor5_inline/build/UploadAdapter.js"></script><!-- ck에디터 -->

    <script src="<%=request.getContextPath()%>/resources/lib/datetimepicker/jquery.datetimepicker.full.min.js"></script><!-- datetimepicker -->
	<script src="<%=request.getContextPath()%><tiles:getAsString name="js"/>"></script> <!-- 페이지 개별 -->
	
	<script>
	const authGrade = '<%= request.getAttribute("authGrade") %>';
	</script>
	
    <title><tiles:insertAttribute name="title" /></title>
  </head>

  <body>
  	<div>
		<div class='popContent'>  	
  			<tiles:insertAttribute name="body"/>
  		</div>
  	</div>
  	
  	<!-- 로딩 패널 -->
  	<div id="loadingPanel" class="loadingPanel">
  		<div class="loadingImg"></div>
  		<div class="loadingText">L o a d i n g . . .</div>
  	</div>
  </body>
  
</html>