import { SectionContainer, SectionLayout } from '../layout/Section';
import styles from '../../styles/Navigation.module.scss';
import { CSSTransition } from 'react-transition-group';

import NavItem from './NavItem';
import NavLogo from './NavLogo';
import NavCta from './NavCta';
import NavOpen from './NavOpen';
import NavClose from './NavClose';

import { useRef } from 'react';

const NavigationBar = ({ variant, navVisibility, navToggle }) => {
	const navItems = useRef([
		{ text: 'Services', link: '/#services' },
		{ text: 'Why me', link: '/#why-me' },
		{ text: 'Newsletter', link: '/#newsletter' },
		{ text: 'Blog', extLink: 'https://blog.syedbasim.com' }
	]);

	if (variant === 'small')
		return (
			<NavigationBarSmall
				navItems={navItems}
				navVisibility={navVisibility}
				navToggle={navToggle}
			/>
		);

	return <NavigationBarLarge navItems={navItems} />;
};

function NavigationBarLarge({ navItems }) {
	return (
		<nav className={`${styles['navigation']} accent--blue`}>
			<SectionContainer variant="nav">
				<SectionLayout variant="nav">
					<ul className={styles['nav-container']}>
						<NavLogo />
						{navItems.current.map((navItem, index) => (
							<NavItem {...navItem} key={index} />
						))}
						<NavCta text={'Contact'} link={'/contact'} />
					</ul>
				</SectionLayout>
			</SectionContainer>
		</nav>
	);
}

function NavigationBarSmall({ navItems, navVisibility, navToggle }) {
	const [navVisible, setNavVisible] = navVisibility;
	const [openNav, closeNav] = navToggle;

	return (
		<nav className={`${styles['navigation--small']} accent--blue`}>
			<SectionContainer variant="nav">
				<SectionLayout variant="nav">
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							alignItems: 'center',
							width: '100%'
						}}
					>
						<ul style={{ listStyle: 'none' }}>
							<NavLogo variant="small" />
						</ul>
						<CSSTransition
							classNames="nav-open-menu"
							in={!navVisible}
							timeout={0}
						>
							<NavOpen openNav={openNav} />
						</CSSTransition>
						<CSSTransition
							classNames="nav-container"
							in={navVisible}
							timeout={500}
							unmountOnExit
						>
							<ul className={styles['nav-container--small']}>
								<NavClose closeNav={closeNav} />
								{navItems.current.map((navItem, index) => (
									<NavItem
										{...navItem}
										key={index}
										closeNav={() => setTimeout(closeNav, 0)}
									/>
								))}
								<NavCta
									text={'Contact'}
									link={'/contact'}
									closeNav={() => setTimeout(closeNav, 0)}
								/>
							</ul>
						</CSSTransition>
					</div>
				</SectionLayout>
			</SectionContainer>
		</nav>
	);
}

export default NavigationBar;
