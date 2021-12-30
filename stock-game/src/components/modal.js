import './modal.css'
import '../index.css'
import {Component} from 'react'

// Must write as class component to assign ref (see Scoreboard)
class Modal extends Component {
  // Class components need constructor to initialize props and state
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(e) {
    if(this.state.open) this.setState({open: false})
    else this.setState({open: true})
  }

  // Class components need render method
  render() {
    return (
      <>
        {this.state.open
          ? (<div className="modal-container">
              <div className="modal-content">
                {this.props.content}
              </div>
            </div>)
          : <></>
        }
      </>
    )
  }
}

export default Modal