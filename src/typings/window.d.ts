// * global
declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
		browserLanguage: string;
	}
}

declare global {
	interface window {
		$microWidgetProps: any; //全局变量名
	}
}

declare const window: any;

export {};
