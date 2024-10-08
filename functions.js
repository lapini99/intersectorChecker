export const checkIntersections = (divRef, variableText, endRef) => {
    function isOutBoundaries(start, end) {
        const isOutside = end.bottom > start.bottom;

        return isOutside;
    }

    let parentElement = variableText.current;

    if (parentElement) {
        let parentHeight = parentElement.clientHeight;
        let totalChildrenHeight = 0;

        let dinamycText = parentElement.querySelectorAll('div.myClass');

        for (let i = dinamycText.length - 1; i >= 0; i--) {
            let child = dinamycText[i];
            totalChildrenHeight = parentElement.firstChild.clientHeight;

            if (
                totalChildrenHeight >= parentHeight ||
                isOutBoundaries(
                    divRef.current.getBoundingClientRect(),
                    endRef.current.getBoundingClientRect(),
                )
            ) {
                child.remove();
            }
        }

        if (totalChildrenHeight < parentHeight) {
            for (let i = 0; i < dinamycText.length - 1; i++) {
                let child = dinamycText[i];
                parentElement.firstChild.appendChild(child);
                totalChildrenHeight = parentElement.firstChild.clientHeight;
                if (
                    totalChildrenHeight >= parentHeight ||
                    isOutBoundaries(
                        divRef.current.getBoundingClientRect(),
                        endRef.current.getBoundingClientRect(),
                    )
                ) {
                    child.remove();
                }
            }
        }
    }
};