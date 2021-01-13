
/**
 * Inline Workers
 */
const timeValue = '10second'; // 10second, 15minute, 30minute, 1hour, 1day
const timeUnit = /^([0-9]+)(\D+)$/i.exec(timeValue); // '숫자', '단위' 값 분리
const [ time, unit ] = Array.isArray(timeUnit) && timeUnit.length === 3 ? [Number(timeUnit[1]), timeUnit[2]] : [];

const timeCounterWorker = new Worker(window.URL.createObjectURL(
	new Blob([`
		// https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
		let timer = null;
		let post = {
			day: '',
			hour: '',
			minute: '',
			second: '',
			millisecond: 0,
		};
		const setTimer = (startMillisecond, totalMillisecond) => {
			const currentMillisecond = Date.now();
			const millisecond = currentMillisecond - startMillisecond;
			let day, hour, minute, second;
			
			// 시간계산
			// https://poiemaweb.com/js-date
			// 86400000ms 는 1day 를 의미한다.
			// 1s = 1,000ms
			// 1m = 60s * 1,000ms = 60,000ms
			// 1h = 60m * 60,000ms = 3,600,000ms
			// 1d = 24h * 3,600,000ms = 86,400,000ms
			second = Math.floor(millisecond / 1000);
			minute = Math.floor(second / 60);
			second = second % 60;
			hour = Math.floor(minute / 60);
			minute = minute % 60;
			day = Math.floor(hour / 24);
			hour = hour % 24;

			// 클라이언트에 데이터 전송 또는 종료
			//if(totalMillisecond && parseInt(totalMillisecond) <= parseInt(currentMillisecond)) {
				//clearTimeout(timer);
				//self.close(); // 웹워커 종료
			//}else {
				day = day.toString();
				hour = ('0' + hour.toString()).slice(-2);
				minute = ('0' + minute.toString()).slice(-2);
				second = ('0' + second.toString()).slice(-2);
				self.postMessage({ ...post, day, hour, minute, second, millisecond, });
			//}
		}

		// 클라이언트측 메시지 받음
		self.onmessage = function(event) {
			const { data={} } = event;
			const { reset=false, startMillisecond=Date.now(), totalMillisecond } = data;

			console.log('[Worker] data', data);
			console.log('[Worker] startMillisecond', startMillisecond);
			console.log('[Worker] totalMillisecond', totalMillisecond);

			clearTimeout(timer);
			if(reset === true) {
				self.postMessage({ ...post, });
			}else {
				timer = setInterval(() => setTimer(startMillisecond, totalMillisecond), 1000);
			}
		};
	`])
));

// 웹워커에서 메시지 응답
timeCounterWorker.onmessage = event => {
	const { data } = event;
	//const { day, hour, minute, second, millisecond } = data;

	console.log('data', data);
	if(unit in data && time <= data[unit]) {
		// 워커에 메시지 전송
		timeCounterWorker.postMessage({ reset: true }); 
	}
};

// 웹워커에 메시지 전송
timeCounterWorker.postMessage(0 < time && unit ? {} : { reset: true }); 

// 웹워커 종료
//timeCounterWorker.terminate(); 