import React, {Component} from 'react'
import './Layout.scss'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'

export default class Layout extends Component {
    state = {
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    render() {
        return (
            <div className='layout'>
                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}