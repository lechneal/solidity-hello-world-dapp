import React from 'react';

export class UpdateForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        this.props.updateMessage(this.state.message)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.props.updateTransactionHash
                    && <div>
                        Waiting for transaction to be mined: {this.props.updateTransactionHash}
                    </div>
                }
                {!this.props.updateTransactionHash
                    && <form onSubmit={this.handleSubmit}>
                        <label>
                            New Message:
                            <input value={this.state.message || this.props.currentMessage} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                }
            </div>
        );
    }
}