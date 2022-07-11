class CheckLastEventStatusUseCase {
    constructor(private readonly loadLastEventRepository: LoadLastEventRepository) {

    }

    async execute(groupId: string): Promise<void> {
        this.loadLastEventRepository.groupId = groupId
    }
}

class LoadLastEventRepository {
    groupId?: string
}

describe('CheckLastEventStatusUseCase', () => {
    it('should get last event data', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const repository = new LoadLastEventRepository()
        const sut = new CheckLastEventStatusUseCase(repository)

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(repository.groupId).toBe(groupIdDummy)
    })
})