export const checkIntersections = (divRef, variableText, endRef) => {
    function isOutBoundaries(tag, end) {
        const isOutside = end.bottom > tag.bottom;

        return isOutside;
    }

    let parentElement = variableText.current;

    if (parentElement) {
        let parentHeight = parentElement.clientHeight;

        let totalChildrenHeight = 0;

        let children = Array.from(parentElement.children);

        children.forEach((child) => {
            totalChildrenHeight += child.clientHeight;

            let splitText = child.innerText.split('.');

            let splitTimes = splitText.length - 1;

            if (
                totalChildrenHeight >= parentHeight ||
                isOutBoundaries(
                    divRef.current.getBoundingClientRect(),
                    endRef.current.getBoundingClientRect(),
                )
            ) {
                for (let i = 0; i < splitTimes; i++) {
                    splitText.pop();
                    child.innerHTML = '<p>' + splitText + '.</p>';
                    totalChildrenHeight =
                        totalChildrenHeight - child.clientHeight;
                    isOutBoundaries(
                        divRef.current.getBoundingClientRect(),
                        endRef.current.getBoundingClientRect(),
                    );
                }

                totalChildrenHeight += child.clientHeight;

                if (totalChildrenHeight >= parentHeight) {
                    parentElement.removeChild(child);
                }

                if (
                    isOutBoundaries(
                        divRef.current.getBoundingClientRect(),
                        endRef.current.getBoundingClientRect(),
                    )
                ) {
                    parentElement.removeChild(parentElement.lastChild);
                }
            }
        });
    }
};