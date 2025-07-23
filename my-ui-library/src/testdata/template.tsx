export const codeBlokVal = {
    title: "sampleCode.tsx",
    code: `function hello() {
    console.log("Hello, world!");
}`
};

export const dragFileSpaceVal = {
    handleFileChange: (files: FileList) => {
        //ここで行いたい処理を行う
        if (files && files.length > 0) console.log(files);
    }
}