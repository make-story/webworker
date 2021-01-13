/*
-
사용가능한 글로벌 객체
1. navigator 객체
2. location 객체(읽기전용)
3. XMLHttpRequest 함수
4. Base64 ASCII와 2진 데이터 간의 상호 변환을 위한 atob() 및 btoa() 함수
5. setTimeout() / clearTimeout() 및 setInterval() / clearInterval()
6. dump()
7. 애플리케이션 캐시
8. importScript() 메서드를 사용하는 외부 스크립트
9. 기타 웹워커 생성 
*/
var request = function() {
	// XMLHttpRequest 인스턴스
	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	var instance = new XMLHttpRequest();

	// 요청
	instance.open('POST', '', true);

	// 완료
	instance.onload = function(event) {
		if(this.status === 200) { // 요청 성공
			console.log('finished');
			console.log(event);
			console.log(this.response);

			// Note: .response instead of .responseText
			//var blob = new Blob([this.response], {type: 'image/png'});

			var data = instance.responseText;
			/*
			if(settings.dataType.toLowerCase() === 'json') {
				data = JSON.parse(data);
			}
			if(typeof settings.success === 'function') {
				settings.success.call(settings.context, data);
			}
			*/
		}else { // 문제 발생
			// 403(접근거부), 404(페이지없음), 500(서버오류발생)
		}
	};

	// 에러
	instance.onerror = function(event) {
		console.log('error');
		console.log(event);
	};

	// 전송 데이터
	instance.send(data);
};


// worker
onmessage = function(event) {
	// 로그
	console.log('worker 수신');
	console.dir(event.data);

	// 워커를 호출한 곳으로 결과 메시지를 전송한다
	postMessage(result);
}; 