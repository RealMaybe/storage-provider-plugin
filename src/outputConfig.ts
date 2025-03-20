// 版本号
export const version = "0.1.1";

// 版权信息
export const writeCopyrightPlugin = () => ({
    name: "write-copyright-plugin",
    generateBundle(_: any, bundle: any) {
        const copyrightBanner = () => [
            "/**",
            " * StorageProvider Plugin",
            ` * @version ${version}`,
            " * @author RealMaybe",
            " * @license MIT",
            " * @see https://github.com/RealMaybe/StorageProvider",
            " */"
        ].join("\n");

        for (const fileName in bundle) {
            if (bundle[fileName].type === "chunk") {
                bundle[fileName].code = copyrightBanner() + "\n" + bundle[fileName].code;
            }
        }
    }
});