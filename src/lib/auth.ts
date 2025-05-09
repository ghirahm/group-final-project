export async function handleLogout() {
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        localStorage.removeItem('accessToken');

        window.location.href = '/auth/signin';
    } catch (error) {
        console.error('Logout failed:', error);
    }
}