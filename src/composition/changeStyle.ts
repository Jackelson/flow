import {ref} from 'vue'
function changeStyle() {
    const dStyle = ref({});
    function change(e:any) {
        if(e) {
            dStyle.value = {
                color: '#4294FF',
            }
        } else {
            dStyle.value = {
                color: '#fff',
            }
        }  
    }
    return {
        dStyle,
        change,
    }
}

export default changeStyle;