import React, { useState, useEffect, useCallback } from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Addsites from '../forms/Addsites';


function Mobilehome() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    const [modals, setModals] = useState({
        addStaff: false,
        site: false,
        general: false
    });
    
    const navigate = useNavigate();

    // Memoized constants
    const soonFeatures = React.useMemo(() => [
        { label: 'OneVault', icon: '📱', color: '#e6e6fa' },
        { label: 'OneTrips', icon: '🧳', color: '#d0f0fd' },
        { label: 'Subscription', icon: '📝', color: '#f9f6e7' },
    ], []);

    const desktopCards = React.useMemo(() => [
        { title: 'Monthly Income', value: '₹0', description: 'Total earnings this month', icon: '⬆️', color: '#e6f4ea' },
        { title: 'Monthly Expense', value: '₹0', description: 'Total expenses this month', icon: '⬇️', color: '#fdeaea' },
        { title: 'Total Balance', value: '₹0', description: 'Net balance', icon: '💰', color: '#eaf1fd' },
    ], []);

    const appOptions = React.useMemo(() => [
        { label: 'Reports', icon: '📊', color: '#eaf1fd', to: '/MonthlyReport' },
        { label: 'Sites', icon: '🏢', color: '#e6f4ea', to: '/sites' },
        { label: 'General', icon: '⚙️', color: '#f9f6e7', to: '/genaral' },
        { label: 'Staff', icon: '👥', color: '#e6f4ea', to: '/staffs' },
        { label: 'Add Staff', icon: '➕', color: '#fdeaea', modal: 'addStaff' },
        { label: 'Add Site', icon: '➕', color: '#fdeaea', modal: 'site' },
        { label: 'Add Gsite', icon: '➕', color: '#fdeaea', modal: 'general' },
    ], []);

    // Event handlers
    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const toggleModal = useCallback((modalName) => {
        setModals(prev => ({
            ...prev,
            [modalName]: !prev[modalName]
        }));
    }, []);

    const handleCloseStaffModal = useCallback(() => toggleModal('addStaff'), [toggleModal]);
    const handleCloseSiteModal = useCallback(() => toggleModal('site'), [toggleModal]);
    const handleCloseGeneralModal = useCallback(() => toggleModal('general'), [toggleModal]);

    const handleOptionClick = useCallback((option) => {
        if (option.to) {
            navigate(option.to);
        } else if (option.modal) {
            toggleModal(option.modal);
        }
    }, [navigate, toggleModal]);

    // Effects
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    if (isMobile) {
        return (
            <Container fluid className="p-0" style={{ background: '#f8f9fa', minHeight: '100vh', fontSize: 15 }}>
                {/* Credit Card Banner */}
                <div style={{ background: '#101c1d', padding: '32px 0 24px 0', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 260, borderRadius: 18, marginBottom: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}></div>
                        <Button
                            style={{
                                background: 'rgba(255,255,255,0.12)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 32,
                                padding: '10px 32px',
                                fontWeight: 600,
                                fontSize: 15,
                            }}
                        >
                            <span style={{ fontSize: 15 }}>Welcome back</span> <span style={{ fontSize: 18, marginLeft: 8 }}>→</span>
                        </Button>
                    </div>
                </div>

                {/* App Main Options Section */}
                <div style={{ margin: '32px 12px 0 12px' }}>
                    <div className="modern-section-title" style={{ marginBottom: 8, fontSize: 16 }}>App Options</div>
                    <Row>
                        {appOptions.map((option, idx) => (
                            <Col xs={4} key={idx} className="mb-3" style={{ paddingLeft: 6, paddingRight: 6 }}>
                                <div
                                    style={{
                                        background: option.color,
                                        borderRadius: 16,
                                        padding: '20px 0 14px 0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                                        minHeight: 100,
                                        cursor: 'pointer',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <div style={{ fontSize: 26, marginBottom: 8 }}>{option.icon}</div>
                                    <div style={{ fontWeight: 600, fontSize: 13, textAlign: 'center', padding: '0 4px' }}>{option.label}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Available Soon Section */}
                <div style={{ margin: '32px 12px 0 12px' }}>
                    <div className="modern-section-title" style={{ marginBottom: 8, fontSize: 16 }}>Available Soon</div>
                    <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>These features will be available to you soon.</div>
                    <div className="d-flex" style={{ gap: 12 }}>
                        {soonFeatures.map((feature, idx) => (
                            <div key={idx} style={{
                                background: feature.color,
                                borderRadius: 16,
                                padding: '14px 8px',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
                            }}>
                                <div style={{ fontSize: 22, marginBottom: 4 }}>{feature.icon}</div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>{feature.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            
               
                <Addsites showModal={modals.site} handleCloseModal={handleCloseSiteModal} />
                <Genaralform showModal={modals.general} handleCloseModal={handleCloseGeneralModal} />
                <Addstaff show={modals.addStaff} handleClose={handleCloseStaffModal} />
            </Container>
        );
    }
}

export default Mobilehome;