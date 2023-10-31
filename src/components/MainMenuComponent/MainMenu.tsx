
import { useMediaQuery, Text, Box, Divider, SimpleGrid } from '@chakra-ui/react';
import './MainMenu.scss';
import Image from 'next/image';
import UserSelect from '@/components/UserSelectComponent/UserSelect';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { mobileMenuSettings, dektopMenuSettings } from '@/utils/menu.configuration';
import appLogo from '@/assets/img/logo.png';
import sun from '@/assets/icons/active/sun.png';


const MainMenu = () => 
{
	
	const router = useRouter();
	const [isForDesktop] = useMediaQuery('(min-width: 990px)');
	const [mobileMenuSettingsState, setMobileMenuSettingsState] = useState(mobileMenuSettings);
	const [dektopMenuSettingsState, setDektopMenuSettingsState] = useState(dektopMenuSettings);

	const navigate = (setting: { src: any; label: string; clickable: boolean; name?: string; selected?: boolean }) => {
		if (setting.clickable) {
			router.push(`/${setting.label}`);
		}

		// Set Selected Menu on Desktop
		if (isForDesktop) {
			const temp = dektopMenuSettingsState;
			for (let index = 0; index < temp.length; index++) {
				const element = temp[index];
				for (let subIndex = 0; subIndex < element.content.length; subIndex++) {
					element.content[subIndex].selected = false;
				}
			}	
			for (let index = 0; index < temp.length; index++) {
				let getOutOfHere = false;
				const element = temp[index];
				for (let subIndex = 0; subIndex < element.content.length; subIndex++) {
					const subElement = element.content[subIndex];
					if (subElement.label === setting.label) {
						subElement.selected = true;
						getOutOfHere = true;
						break;
					}
				}
				if (getOutOfHere) {
					break;
				}
			}
			// Just force rerendering
			setDektopMenuSettingsState(previous => { return [...temp]});
		}
	}

	return(
		<div className="MainMenuWrapper">
			{
				isForDesktop ? 
				<>
					<Box key="mainMenuId" className='menu'>
						<Box mt="4"/>
						<Image
							src={appLogo}
							alt="App Logo"
						/>
						<Box mt="4"/>
						{
							dektopMenuSettingsState?.map(item => (
								<>
									{
										item.title.length > 0 ?
										<>
											<Divider backgroundColor="var(--divider-desktop-color-background)" height="1px" />
											<Box mt="4"/>
											<Text fontSize="xl">
												{ item.title }
											</Text>
											<Box mt="3"/>											
										</>
										:
										<></>
									}
									{
										item.content?.map(menuItem => (
											<Box padding="4" className={menuItem.selected ? "menuItem selected-menuItem" : "menuItem"} key={menuItem.label + "icond"} onClick={() => navigate(menuItem)}>
												<Image
													src={menuItem.src}
													alt={menuItem.label + "icon"}
												/>
												<Text fontSize="md" ml="2">
													{ menuItem?.name }
												</Text>
											</Box>
										))
									}
								</>
							))
						}
					</Box>
					<Box key="authUserMenuId" className='authUser' mt="10vh" mb="3vh">
						<Divider backgroundColor="var(--divider-desktop-color-background)" height="1px" />
						<Box mt="3" mb="3">
							<UserSelect/>
						</Box>
						<Divider backgroundColor="var(--divider-desktop-color-background)" height="1px" />
						<Box mt="2" />
						<Box className='options'>
							<Box borderRadius="2xl" display="flex" flexFlow="row nowrap" padding="2" width="70px" backgroundColor={"var(--item-background)"} fontSize="sm">
								<Image
									src={sun}
									alt="Light mode"
									style={{width: 15, height: 15 }}
								/>
								<Text ml="1" fontSize="xs">
									Clair
								</Text>
							</Box>
							<Text fontSize="xs" cursor="pointer">Donner</Text>
							<Text fontSize="xs" cursor="pointer">A propos</Text>
						</Box>
					</Box>
				</>
				:
				<>
					{
						mobileMenuSettingsState?.map(item => (
							<Box key={item.label + "icon"} onClick={() => navigate(item)}>
								<Image
									src={item.src}
									alt={item.label + "icon"}
								/>
							</Box>
						))
					}
				</>
			}			
		</div>
	)
}

export default MainMenu