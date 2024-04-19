// HamburgerMenu.tsx
import React, { useState } from 'react';
import MenuIcon from '@/components/MenuIcon/MenuIcon';

const HamburgerMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='relative'>
			<button onClick={() => setIsOpen(!isOpen)}>
				<img
					src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713478291/AwareGaming/Rectangle_425hamburger_vbbbxx.png'
					alt='burgerIcon'
				/>
			</button>
			{isOpen && (
				<div className='absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl'>
					<MenuIcon />
				</div>
			)}
		</div>
	);
};

export default HamburgerMenu;
