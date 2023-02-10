import { getTreeDetail } from "@/api/nodeTree";

export function getDetail(node : any, name: any) {
    const getTreeD =async () => {
        const res = await getTreeDetail(name.value);
        node.value = JSON.parse(res.data.content); 
    }
    return {
        getTreeD,
    }
}