import NextArrow from '@/assets/icons/next.svg';
import PrevArrow from '@/assets/icons/prev.svg';
import { dataSlider } from '@/constants/slider-data';
import { useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { SliderProps } from '../types/slider';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';

register();

export const Slider = ({ className }: SliderProps) => {
	const swiperElRef = useRef(null);

	const handlerNext = () => {
		swiperElRef.current.swiper.slideNext();
	};
	const handlerPrev = () => {
		swiperElRef.current.swiper.slidePrev();
	};

	return (
		<div className={className}>
			<swiper-container
				ref={swiperElRef}
				navigation-next-el='.custom-next-button'
				navigation-prev-el='.custom-prev-button'
				slides-per-view='1'
				navigation='true'
				pagination='true'
				loop='true'
				autoplay-delay='6000'
				class={`h-full`}
			>
				{dataSlider.map(slide => (
					<swiper-slide key={slide.title} class='h-full px-[64px] lg:px-[96px]'>
						<div className='absolute top-0 left-0 z-[-1] w-full h-full'>
							<img
								className='object-cover w-full h-full'
								src={slide.imagePath}
								alt={slide.title}
							/>
							<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-75'></div>
						</div>
						<div className='flex flex-col items-start pt-[237px]'>
							<Heading
								level='h2'
								className='text-white max-xl:text-[32px] text-[40px] '
							>
								{slide.title}
							</Heading>
							<Heading
								level='p'
								className='text-grayLight max-xl:text-[22px] text-[24px] mt-2'
							>
								{slide.preview}
							</Heading>

							<Button
								to='#'
								className='px-12 mt-8'
								variant={slide.variantButton}
							>
								Подробнее
							</Button>
						</div>
					</swiper-slide>
				))}
			</swiper-container>
			<div
				className='custom-prev-button w-sidebar h-full absolute top-0 cursor-pointer z-20 bg-transparent bg-opacity-0 hover:bg-main hover:bg-opacity-20 transition-colors'
				onClick={handlerPrev}
			>
				<div className='absolute top-1/2 -translate-y-1/2 left-7'>
					<PrevArrow />
				</div>
			</div>

			<div
				className='custom-next-button w-sidebar h-full absolute top-0 right-0 cursor-pointer z-20 bg-transparent bg-opacity-0 hover:bg-main hover:bg-opacity-20 transition-colors'
				onClick={handlerNext}
			>
				<div className='absolute top-1/2 -translate-y-1/2 right-7'>
					<NextArrow />
				</div>
			</div>
		</div>
	);
};
