class CheckLastEventStatusUseCase {
    constructor(private readonly loadLastEventRepository: LoadLastEventRepository) {}

    async execute(groupId: string): Promise<void> {
        await this.loadLastEventRepository.loadLastEvent(groupId)
    }
}

interface LoadLastEventRepository {
    loadLastEvent(groupId: string): Promise<void>
}

class FakeLoadLastEventRepository implements LoadLastEventRepository {
    groupId?: string

    async loadLastEvent(groupId: string): Promise<void> {
        this.groupId = groupId
    }
}

describe('CheckLastEventStatusUseCase', () => {
    it('should get last event data', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const repository = new FakeLoadLastEventRepository()
        const sut = new CheckLastEventStatusUseCase(repository)

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(repository.groupId).toBe(groupIdDummy)
    })

    it('should get last event data only once', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const repository = new FakeLoadLastEventRepository()
        const sut = new CheckLastEventStatusUseCase(repository)

        const mockFn = jest.fn()
        repository.loadLastEvent = mockFn

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(mockFn.mock.calls.length).toBe(1)
        expect(mockFn.mock.calls[0][0]).toBe(groupIdDummy)
    })
})