import React from 'react'
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '800px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const HowToUse = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
      return (
        <div className='m-2 md:m-10'>
        <div className="flex justify-center mt-16 flex-col items-center">
        <h1 className="text-3xl md:text-5xl p-2 tracking-loose mb-2">
          How to use our Product
        </h1>
      </div>
        <Carousel afterChange={onChange} arrows>
          <div>
            {/* <h3 style={contentStyle}>1</h3> */}
            <div>
                <img 
                    style={contentStyle}
                    src='/logomain.png'
                />
            </div>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        </div>
      );
}

export default HowToUse