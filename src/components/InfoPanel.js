import React from 'react';
import './info-panel-styles.css';

import { MAP_MODE } from '../configs/map';

import Header from './Header';
import Footer from './Footer';

function getCssClass(btnMode, currentMode) {
	return (btnMode === currentMode) ? 
		'active' :
		'';
}

const InfoPanel = ({ mode, isLoading, onToggle }) => {

		return (
			<div className="info-panel">
				<Header />
				{
					isLoading ? 
					( <main>
							<div className="preloader"></div> 
					  </main> ) :
					( <main>
					        <p>Выбор режима карты:</p>
						    <div className="buttons">
								<button 
									data-mode={ MAP_MODE.POINTS }
									className={ getCssClass(MAP_MODE.POINTS, mode) }
									onClick={ onToggle }>
									2D view
								</button>
								<button 
									data-mode={ MAP_MODE.GRID }
									className={ getCssClass(MAP_MODE.GRID, mode) }
									onClick={ onToggle }>
									3D view
								</button>
								<p>Полный список камер:</p>
								<p>- Камеры на скорость</p>
								<p>- Камеры на парковку</p>
								<p>- Камеры на пешеходов</p>
								<p>- Камеры на полосу</p>
								<p>- Камеры на скорость, движение по выделенной полосе</p>
								<p>- Камеры на среднюю скорость</p>
								<p>- Камеры на стоянку</p>
								<p>- Камеры на проезд перекрестка, стоп-линии</p>
						    </div> 
					  </main> )
				}
				<Footer />
			</div>);
};

export default InfoPanel;