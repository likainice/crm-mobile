export interface LoginFormType {
	newUsername?: string;
	newPassword?: string;
	Tel1?: string;
}
export type LoginType = {
	ruleForm?: LoginFormType;
	checked?: boolean;
	wwCode?: boolean;
};
