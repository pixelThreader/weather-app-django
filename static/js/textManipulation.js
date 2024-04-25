$(document).ready(function () {
    async function appendDataToTextElements(classname, dataList) {
        const textElements = $(`.${classname}`);
        const promises = textElements.map((index, element) => {
            return new Promise((resolve) => {
                gsap.to(element, {
                    duration: 1,
                    text: dataList[index],
                    onComplete: resolve,
                });
            });
        }).get();

        await Promise.all(promises);
    }
    function getText(classname) {
        let textArr = {};
        let textList = $(`.${classname}`);

        textList.each(function (index, element) {
            textArr[index] = element.innerHTML;
            $(element).text("");
        });

        appendDataToTextElements(classname, Object.values(textArr));
    }
    $('#selfon').on('change', function () {
        $(this).removeClass('fon0 fon1 fon2 fon3 fon4');
        let ms = `fon` + this.value;
        $(this).addClass(ms);
        getText('chFontGSP');
        document.querySelector('#theme-font').value=ms;
        appendFont('.chFontGSP', ms);
    });
});