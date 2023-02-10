import { ref , onBeforeMount} from "vue";
import { getTreeList } from "@/api/nodeTree";
export function getNodetree() {
    const treeList = ref('');
    const getNodeList = async () => {
        const res = await getTreeList();
        treeList.value = res.data;
    }
    onBeforeMount(() => {
        getNodeList();
    })
    return {
        getNodeList,
        treeList,
    }
}