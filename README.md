# WebWorker
## https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API  
## https://dassur.ma/things/when-workers/?fbclid=IwAR3ChZhp6tb5Ck6xfqqli1AxDZj9F0ChZz6WNFWloxXXws5gEzfZ7KXrQ3Y  
  
> 정리문서  
http://makestory.net/media/#/view/626  
  
-----

> Worker는 현재 Window와 분리된 DuplicatedWorkerGlobalScope라는 별도의 Global context에서 동작합니다.  
Message System을 통해 Worker와 메인 쓰레드 간에 데이터를 교환할 수 있습니다.   
Worker.postMessage() 메서드를 통해 데이터를 전송, Worker.onmessage 이벤트 핸들러 통해 응답할 수 있습니다. (전송되는 메세지는 MessageEvent.data에 포함됩니다).   
