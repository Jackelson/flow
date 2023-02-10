import { getPeopleLocation } from "@/api/radar";
import { ref, onBeforeMount } from "vue";
export function setRadar() {
    const perception: any = ref([]);
    onBeforeMount(() => {
        setInterval(() => {
            perception.value = [];
            getPeopleLocation().then(res => {
                if(res?.data) {
                    res.data.forEach((item: any) => {
                        perception.value.push({
                            locationX: JSON.parse(item.location)[0] > 0 ? Math.abs(JSON.parse(item.location)[0]*80) + 120: 120 - Math.abs(JSON.parse(item.location)[0]*80),
                            locationY: JSON.parse(item.location)[1] > 0 ? Math.abs(JSON.parse(item.location)[1]*80) + 120: 120 - Math.abs(JSON.parse(item.location)[1]*80),
                        })
                    });
                }
            })
            
        }, 3000);
    })
 
    return  {
        perception,
    };
}
