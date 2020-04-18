import React from "react";

import './Practice.css';

class Practice extends React.Component {
    // TODO: deal with descriptions on hover?
    render() {
        let dateStr;
        switch(this.props.date.month) {
            case 0:
                dateStr = 'January';
                break;
            case 1:
                dateStr = 'February';
                break;
            case 2:
                dateStr = 'March';
                break;
            case 3:
                dateStr = 'April';
                break;
            case 4:
                dateStr = 'May';
                break;
            case 5:
                dateStr = 'June';
                break;
            case 6:
                dateStr = 'July';
                break;
            case 7:
                dateStr = 'August';
                break;
            case 8:
                dateStr = 'September';
                break;
            case 9:
                dateStr = 'October';
                break;
            case 10:
                dateStr = 'November';
                break;
            case 11:
                dateStr = 'December';
                break
            default: 
                dateStr = ''; 
                break
        }

        const formattedInstrument = this.props.instrument.charAt(0).toUpperCase() 
                                    + this.props.instrument.slice(1);

        return(
            <div className = "Practice">
                <div className = "PracticeCol PaddedDate">
                    <p>
                        {dateStr + ' ' 
                         + this.props.date.day + ', ' 
                         + this.props.date.year}
                    </p>
                </div>
                <div className = "PracticeCol PaddedLength">
                    {this.props.length.hours + ':' + this.props.length.minutes + ':' + this.props.length.seconds}
                </div>
                <div className = "PracticeCol PaddedInstrument">
                    {formattedInstrument}
                </div>
                <div className = "PracticeCol PaddedPitch">
                    {this.props.pitches}
                </div>
                <div className = "PracticeDescription">
                    Description: {this.props.description}
                </div>
            </div>
        )
    }
}

export default Practice;