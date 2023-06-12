
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";
import { EffectFade, Navigation, Pagination } from "swiper";
import BarLoader from 'react-spinners/BarLoader';



const TopSlider = () => {

    const { data: sliderDetails = [], isLoading } = useQuery({
        queryKey: ['allclasses'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/sliderDetails`)
            return res.data;
        },
    })
    return (
        <div className='my-5 sm:mt-20  md:mx-auto'>
            {
                isLoading ? (
                    <p><BarLoader color="#38ecd4" /></p>
                ) : (
                    <Swiper
                        spaceBetween={30}
                        effect={"Fade"}
                        navigation={true}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        scrollbar={{ draggable: true }}
                        modules={[EffectFade, Navigation, Pagination]}
                        className="mySwiper"
                    >
                        {
                            sliderDetails && sliderDetails?.map(
                                details => <SwiperSlide key={details._id} className='text-center max-h-[450px] '>
                                    <img className='object-contain h-fit w-full' src={details?.storedClass?.classPhoto} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                )
            }
        </div>
    );
};

export default TopSlider;