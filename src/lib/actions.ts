'use server';

export async function deleteUser(userId: number) {
	console.log('Deleting user with id:', userId);
	// Uncomment this to enable deletion
	// await deleteUserById(userId);
	// revalidatePath('/');
}
