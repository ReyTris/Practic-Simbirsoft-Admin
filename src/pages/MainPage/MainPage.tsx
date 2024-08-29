import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { PathNames } from '@/router/pathNames';
export const MainPage = () => {
	return (
		<div className="h-full flex">
			<div className="w-full lg:w-3/5 xl:w-1/2">
				<Container className="flex flex-col">
					<Header />
					<div className="mt-[140px] max-md:mt-[32px]">
						<Heading level="h1">
							Каршеринг <br /> <span className="text-main">Need for drive</span>
						</Heading>
						<Heading
							level="p"
							className="mt-[34px] max-md:mt-[16px] text-[26px] max-md:text-[18px]"
						>
							Поминутная аренда авто твоего города
						</Heading>
						<Button
							to={PathNames.ORDER_PAGE + '/' + PathNames.POSITION_PAGE}
							className="mt-[32px] md:mt-[60px] px-14"
							variant="green-to-darkgreen"
						>
							Забронировать
						</Button>
					</div>
					<div className="mt-auto flex justify-between items-center py-[32px] max-md:py-[16px] max-md:flex-col-reverse max-md:items-end max-md:justify-end">
						<Heading className="text-gray" level="p">
							© 2016-2019 «Need for drive»
						</Heading>
						<Button
							to="tel:84952342244"
							className="text-black px-0 transition-colors hover:text-main"
						>
							8 (495) 234-22-44
						</Button>
					</div>
				</Container>
			</div>
		</div>
	);
};
