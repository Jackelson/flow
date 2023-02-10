import { ref , onBeforeMount, onBeforeUnmount} from "vue";

function resize() {
    const dWdith =  ref(1540);
    const returnLeft = ref(0);
    function changeSize(){
        // 总宽度
        const widths = document.documentElement.scrollWidth; 
        // 中间的区域
        const midel = widths - 1476 - 2226 - 72;
        if(midel > 190) {
            dWdith.value =  midel / 2 + 1476 + 70;
        } else {
            dWdith.value = 1540;
        }
        returnLeft.value = widths - 100;
    }
    onBeforeMount(() => {
        window.addEventListener("resize", changeSize);
        changeSize();
    });
    onBeforeUnmount(() => {
        window.removeEventListener("resize", changeSize);
    })
   
    return {dWdith,returnLeft};
}

export default resize;