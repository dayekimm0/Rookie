import { create } from "zustand";

const logonStore = create((set) => ({
  step: 1,
  formData: {
    username: "",
    favoriteTeam: "",
    birthdate: { year: "", month: "", date: "" },
    phoneNumber: { part1: "", part2: "", part3: "" },
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    postalCode: "",
    address: "",
    detailedAddress: "",
    agreements: {
      all: false,
      required: false,
      privacy: false,
      promotion: false,
    },
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  resetForm: () =>
    set({
      step: 1,
      formData: {
        username: "",
        favoriteTeam: "",
        birthdate: { year: "", month: "", date: "" },
        phoneNumber: { part1: "", part2: "", part3: "" },
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
        postalCode: "",
        address: "",
        detailedAddress: "",
        agreements: {
          all: false,
          required: false,
          privacy: false,
          promotion: false,
        },
      },
    }),
}));

export default logonStore;

//formData: 모든 입력 데이터를 저장.
// setFormData: 폼 데이터를 업데이트.
// nextStep: 다음 단계로 이동.
// resetForm: 폼과 단계를 초기화 (회원가입 완료 후 사용).
