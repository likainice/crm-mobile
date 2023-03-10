/**
 * render 模板渲染
 * 封装iconfont组件，默认`font-class`引用模式，支持`unicode`引用、`font-class`引用、`symbol`引用 （https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.20&helptype=code）
 */
import { defineComponent, h } from "vue";

export default defineComponent({
	name: "SvgIcon",
	props: {
		name: {
			type: String,
			default: ""
		},
		svg: {
			type: String,
			default: "svg"
		},
		size: {
			type: String,
			default: "2em"
		},
		color: {
			type: String,
			default: "#333"
		}
	},
	render() {
		const attrs = this.$attrs;

		if (this.svg === "uni") {
			return h(
				"i",
				{
					class: "iconfont",
					...attrs
				},
				this.name
			);
		} else if (this.svg === "svg") {
			return h(
				"svg",
				{
					class: "svg-icon",
					"aria-hidden": true,
					width: this.size,
					height: this.size
				},
				{
					default: () => [
						h("use", {
							"xlink:href": `#${this.name}`,
							fill: this.color
						})
					]
				}
			);
		} else {
			return h("i", {
				class: `iconfont ${this.name}`,
				...attrs
			});
		}
	}
});
